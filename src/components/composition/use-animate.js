let states = {
  STOP: 3,
  PAUSE: 2,
  PLAY: 1,
};

export default function useAnimate() {
  let state = states.STOP;
  let startTime = 0;
  let pausedTime = 0;
  let requestId;
  let animations;

  let play = () => {
    if (state === states.PLAY) return;
    startTime = performance.now() - pausedTime;
    state = states.PLAY;

    requestId = requestAnimationFrame(animate);
  };

  let stop = () => {
    state = states.STOP;
    pausedTime = 0;

    cancelAnimationFrame(requestId);
  };

  let pause = () => {
    if (state === states.PAUSE || state === states.STOP) return;
    state = states.PAUSE;
    pausedTime = performance.now() - startTime;

    cancelAnimationFrame(requestId);
  };

  let set = (animation) => {
    animations = Array.isArray(animation) ? animation : [animation];
    animations = animations.map((animation) => {
      if (!animation.duration[1]) {
        animation.duration = [0, animation.duration]
      }
      return animation
    })
  };

  let destroy = () => stop();

  let animate = (time) => {
    let timeFraction;
    let continueAnimate = false;

    for (let animation of animations) {
      timeFraction =
        (time - startTime - animation.duration[0]) / animation.duration[1];

      if (timeFraction > 1) timeFraction = 1;
      if (timeFraction < 0) timeFraction = 0;
      if (timeFraction < 1) continueAnimate = true;

      let progress = animation.timing(timeFraction);

      animation.draw(progress);
    }

    if (state === states.PLAY && continueAnimate) {
      requestId = requestAnimationFrame(animate);
    }
  };

  return {
    play,
    stop,
    pause,
    set,
    destroy,
  };
}
