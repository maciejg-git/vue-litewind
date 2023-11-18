let states = {
  STOP: 3,
  PAUSE: 2,
  PLAY: 1,
};

let remap = (v, range) => (v * (range[1] - range[0])) / 1 + range[0];

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
    animations = (Array.isArray(animation) ? [...animation] : [animation])
      .map((i) => {
        return { ...i };
      })
      .map((i) => {
        if (!i.duration[1]) i.duration = [0, i.duration];
        i._isAlternate =
          i.direction === "alternate" || i.direction === "alternate-reverse";
        i._isReverse =
          i.direction === "reverse" || i.direction === "alternate-reverse";
        i._reverse = i._isReverse;
        i._cycles = 0;
        i.repeat = i.repeat === true ? 9999999 : +i.repeat
        return i;
      });
  };

  let destroy = () => stop();

  let animate = (time) => {
    let continueAnimate = false;

    for (let animation of animations) {
      let totalFraction =
        (time - startTime - animation.duration[0]) / animation.duration[1];
      let timeFraction = totalFraction;

      if (animation.repeat && animation.repeat > animation._cycles) {
        timeFraction -= animation._cycles;
        if (animation._isAlternate)
          animation._reverse = (animation._cycles + animation._isReverse) % 2;
        animation._cycles = Math.trunc(totalFraction);
      }

      if (animation._reverse) timeFraction = 1 - timeFraction;

      timeFraction = timeFraction < 0 ? 0 : timeFraction > 1 ? 1 : timeFraction;

      if (
        animation.repeat ||
        (!animation._reverse && timeFraction < 1) ||
        (animation._reverse && timeFraction > 0)
      )
        continueAnimate = true;

      let progress = animation.timing(timeFraction);
      let rawProgress = progress

      if (animation.remap) progress = remap(progress, animation.remap);

      animation.draw(progress, rawProgress);
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
