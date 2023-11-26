let remap = (v, range) => (v * (range[1] - range[0])) / 1 + range[0];
let clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
let steps = (t, s) => Math.ceil((Math.min(Math.max(t, 0.000001), 1)) * s) * (1 / s)

let defaultState = {
  timeFraction: 0,
  totalFraction: 0,
  frameFraction: 0,
  frame: 0,
  reverse: false,
  cycles: 0,
  frameOffset: 0,
  delayOffset: 0,
};

export default function useAnimate() {
  let state = "stop";
  let startTime = 0;
  let pausedTime = 0;
  let animations = [];
  let pausedOffset = 0
  let pausedAt = 0

  let play = () => {
    if (state === "play") return;
    // startTime = performance.now() - pausedTime;
    if (!startTime) startTime = performance.now()
    if (pausedAt) pausedOffset += (performance.now() - pausedAt)
    state = "play";
    animations.forEach((animation) => animate(animation));
  };

  let stop = () => {
    state = "stop";
    startTime = 0;
    animations.forEach((animation, i) => {
      cancelAnimationFrame(animation.reqId)
      animations[i].state = { ...defaultState }
    });
  };

  let pause = () => {
    if (state === "pause" || state === "stop") return;
    state = "pause";
    // pausedTime = performance.now() - startTime;
    pausedAt = performance.now()
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
          if (!f.remap) f.remap = i.remap ?? null;
          if (!f.reverse) f.reverse = false
          return f;
        });
        i.state = { ...defaultState, reverse: i._isReverse }
        i.state.delay = (d) => {
          i.state.delayOffset = performance.now() + d
          i.state.frameOffset += d
        }
        return i;
      });
  };

  let destroy = () => stop();

  let animate = (animation) => {
    let { state, _frames, _isAlternate, _isReverse } = animation;

    let step = (time) => {
      time = time - pausedOffset
      // state.delayOffset -= pausedOffset
      // startTime -= pausedOffset
      if (time < state.delayOffset - pausedOffset) {
        console.log('delay')
        animation.reqId = requestAnimationFrame(step)
        return
      }
      let continueAnimation = false
      let frame = _frames[state.frame];
      let elapsed = time - startTime
      state.totalFraction = elapsed / animation.duration;
      state.timeFraction =
        (elapsed - state.frameOffset) / frame.duration;
      console.log("frame", state.frame)
      console.log("elapsed", elapsed - state.frameOffset)
      console.log("timeFraction", state.timeFraction)
      // console.log("totalFraction", state.totalFraction)

      state.timeFraction = clamp(state.timeFraction);
      state.totalFraction = clamp(state.totalFraction - state.cycles);

      if (frame.reverse || state.reverse) state.timeFraction = 1 - state.timeFraction;

      let progress = frame.timing(state.timeFraction);

      if (frame.remap) progress = remap(progress, frame.remap);

      animation.draw(progress, state);
      if (frame.draw) frame.draw(progress, state)

      if (
        ((!state.reverse || !frame.reverse) && state.timeFraction === 1) ||
        ((state.reverse || frame.reverse) && state.timeFraction === 0)
      ) {
        state.frameOffset += frame.duration;
        if (animation.afterFrame) animation.afterFrame(state.frame, state)
        if (++state.frame >= _frames.length) {
          state.frame = 0;
          if (animation.repeat) {
            state.cycles++;
            if (_isAlternate) {
              state.reverse = (state.cycles + _isReverse) % 2;
            }
            continueAnimation = true
          }
        } else continueAnimation = true
        state.frameFraction = state.frame/_frames.length 
      } else continueAnimation = true

      if (continueAnimation) animation.reqId = requestAnimationFrame(step)
      else if (animation.finished) animation.finished()
    };
    animation.reqId = requestAnimationFrame(step);
  };

  return {
    play,
    stop,
    pause,
    set,
    destroy,
    steps,
  };
}
