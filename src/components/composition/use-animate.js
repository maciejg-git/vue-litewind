let remap = (v, range) => (v * (range[1] - range[0])) / 1 + range[0];
let clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

let defaultAnimationState = {
  timeFraction: 0,
  totalFraction: 0,
  frame: 0,
  reverse: false,
  cycles: 0,
  frameOffset: 0,
};

export default function useAnimate() {
  let state = "stop";
  let startTime = 0;
  let pausedTime = 0;
  let animations = [];

  let play = () => {
    if (state === "play") return;
    startTime = performance.now() - pausedTime;
    state = "play";
    animations.forEach((animation) => animate(animation));
  };

  let stop = () => {
    state = "stop";
    pausedTime = 0;
    animations.forEach((animation, i) => {
      cancelAnimationFrame(animation.reqId)
      animations[i].state = { ...defaultAnimationState }
    });
  };

  let pause = () => {
    if (state === "pause" || state === "stop") return;
    state = "pause";
    pausedTime = performance.now() - startTime;
    animations.forEach((animation) => cancelAnimationFrame(animation.reqId))
  };

  let set = (animation) => {
    animations = (Array.isArray(animation) ? [...animation] : [animation])
      .map((i) => {
        return { ...i };
      })
      .map((i) => {
        i._isAlternate =
          i.direction === "alternate" || i.direction === "alternate-reverse";
        i._isReverse =
          i.direction === "reverse" || i.direction === "alternate-reverse";
        i.repeat = i.repeat === true ? 9999999 : +i.repeat;
        if (Array.isArray(i?.frames)) i._frames = [...i.frames];
        else
          i._frames = Array.from({ length: i.frames || 1 }, () => ({
            duration: i.duration / (i.frames || 1),
          }));
        i._frames = i._frames.map((f) => {
          if (!f.duration) f.duration = 0;
          if (!f.timing) f.timing = i.timing;
          return f;
        });
        i.state = { ...defaultAnimationState }
        i.state.reverse = i._isReverse
        return i;
      });
  };

  let destroy = () => stop();

  let animate = (animation) => {
    let { state } = animation;

    let step = (time) => {
      let frame = animation._frames[state.frame];
      let elapsed = time - startTime
      state.totalFraction = elapsed / animation.duration;
      state.timeFraction =
        (elapsed - state.frameOffset) / frame.duration;

      state.timeFraction = clamp(state.timeFraction);
      state.totalFraction = clamp(state.totalFraction) - state.cycles;

      if (state.reverse) state.timeFraction = 1 - state.timeFraction;

      let progress = frame.timing(state.timeFraction);

      if (animation.remap) progress = remap(progress, animation.remap);

      animation.draw(progress, state);

      if (
        (!state.reverse && state.timeFraction === 1) ||
        (state.reverse && state.timeFraction === 0)
      ) {
        state.frameOffset += frame.duration;
        if (++state.frame >= animation._frames.length) {
          state.frame = 0;
          if (animation.repeat) {
            state.cycles++;
            if (animation._isAlternate) {
              state.reverse = (state.cycles + animation._isReverse) % 2;
            }
            animation.reqId = requestAnimationFrame(step);
          }
        } else animation.reqId = requestAnimationFrame(step);
      } else animation.reqId = requestAnimationFrame(step);
    };
    animation.reqId = requestAnimationFrame(step);
  };

  return {
    play,
    stop,
    pause,
    set,
    destroy,
  };
}
