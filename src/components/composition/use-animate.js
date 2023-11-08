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

  let duration = 0;
  let timing = null;
  let draw = null;

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

  let play = () => {
    if (state === states.PLAY) return;
    startTime = performance.now() - pausedTime;
    state = states.PLAY;

    requestId = requestAnimationFrame(animate);
  };

  let set = (animation) => {
    ({ duration, timing, draw } = animation);
  };

  let destroy = () => stop();

  let animate = (time) => {
    let timeFraction = (time - startTime) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress);

    if (state === states.PLAY && timeFraction < 1) {
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
