let states = {
  STOP: 3,
  PAUSE: 2,
  PLAY: 1,
};

let remap = (v, min, max) => ((v - 0) * (max - min)) / (1 - 0) + min;

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
    animations = Array.isArray(animation) ? [...animation] : [animation];
    animations = animations
      .map((i) => {
        return { ...i };
      })
      .map((animation) => {
        if (!animation.duration[1]) {
          animation.duration = [0, animation.duration];
        }
        animation._cycles = 0;
        animation._reverse =
          animation.direction === "reverse" ||
          animation.direction === "alternate-reverse";
        return animation;
      });
  };

  let destroy = () => stop();

  let animate = (time) => {
    let continueAnimate = false;

    for (let animation of animations) {
      let timeFraction =
        (time - startTime - animation.duration[0]) / animation.duration[1];

      timeFraction = timeFraction - animation._cycles;
      if (animation._reverse) timeFraction = 1 - timeFraction;

      if (timeFraction < 0) timeFraction = 0;
      if (timeFraction > 1) timeFraction = 1;

      if (
        (!animation._reverse && timeFraction < 1) ||
        (animation._reverse && timeFraction > 0)
      ) {
        continueAnimate = true;
      } else if (animation.repeat) {
        animation._cycles++;
        continueAnimate = true;
        if (
          animation.direction === "alternate" ||
          animation.direction === "alternate-reverse"
        )
          animation._reverse = !animation._reverse;
      }

      let progress = animation.timing(timeFraction);

      if (animation.remap)
        progress = remap(progress, animation.remap[0], animation.remap[1]);

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
