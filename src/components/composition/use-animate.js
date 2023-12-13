let remap = (v, range) => (v * (range[1] - range[0])) / 1 + range[0];
let clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
let steps = (t, s) =>
  Math.ceil(Math.min(Math.max(t, 0.000001), 1) * s) * (1 / s);
let promise = (i) => new Promise((res) => (i.resolve = res));

let defaultState = {
  startTime: 0,
  timeFraction: 0,
  progress: 0,
  frameFraction: 0,
  frameIndex: 0,
  reverse: false,
  cycles: 0,
  delayEnd: 0,
  delayStart: 0,
  delayOffset: 0,
  delayTotal: 0,
  elapsed: 0,
  nextFrame: false,
  _trackComplete: false,
  _isAllComplete: true,
  frame: null,
  next() {
    this.nextFrame = true;
  },
  isComplete() {
    return (
      ((this.reverse || this.frame.reverse) && this.timeFraction === 0) ||
      (!this.reverse && !this.frame.reverse && this.timeFraction === 1)
    );
  },
  isAllComplete() {
    return this._isAllComplete
  },
  getTimeFraction(offset = 0) {
    // if (offset < 0) offset = 0;
    let timeFraction =
      (this.elapsed - offset) / this.frame.duration;
    timeFraction = clamp(timeFraction);
    if (this.reverse || this.frame.reverse) timeFraction = 1 - timeFraction;
    return timeFraction;
  },
  update(offset = 0) {
    this.timeFraction = this.getTimeFraction(offset);
    this.progress = this.getProgress(offset);
    this._isAllComplete = !this.isComplete() ? false : this._isAllComplete
  },
  setTiming(timing) {
    this.frame.timing = timing;
  },
  getProgress(offset = 0) {
    let progress = this.frame.timing(this.getTimeFraction(offset));
    if (this.frame.remap) progress = remap(progress, this.frame.remap);
    return progress;
  },
};

export default function useAnimate() {
  let state = "stop";
  let animations = [];
  let pausedOffset = 0;
  let pausedAt = 0;

  let play = (index, update) => {
    if (state === "play") return;
    if (pausedAt) pausedOffset += performance.now() - pausedAt;
    state = "play";
    animate(animations[index], update);
    return promise(animations[index]);
  };

  let stop = () => {
    state = "stop";
    animations.forEach((animation, i) => {
      cancelAnimationFrame(animation.reqId);
      animation.tracks.forEach((t, index) => {
        t.state = { ...defaultState, track: index}
      })
    });
  };

  let pause = () => {
    if (state === "pause" || state === "stop") return;
    state = "pause";
    pausedAt = performance.now();
    animations.forEach((animation) => cancelAnimationFrame(animation.reqId));
  };

  let timeline = (...timeline) => {
    timeline[0]({ play });
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
        i._frames = i._frames.map((t) => {
          return t.map((f) => {
          if (!f.duration) f.duration = 0;
          if (!f.timing) f.timing = i.timing ?? ((i) => i);
          if (!f.remap) f.remap = i.remap ?? null;
          if (!f.reverse) f.reverse = false;
          return f;
        })
        });
        i.tracks = Array.from({ length: i.frames.length }, () => ({})).map((t, index) => {
          t.state = { ...defaultState, track: index, reverse: i._isReverse };
          t.state.delay = (delay) => {
            if (state === "pause" || t.state.delayEnd) return;
            t.state.delayStart = performance.now() - pausedOffset;
            t.state.delayEnd = t.state.delayStart + delay;
            t.state.delayTotal += delay;
          };
          return t
        })
        return i;
      });
  };

  let destroy = () => stop();

  let animate = (animation, update) => {
    let { tracks, _frames, _isAlternate, _isReverse } = animation;

    let step = (time) => {
      let continueAnimation = false;
      time -= pausedOffset;
      for (let track of tracks) {
      let { state } = track
      if (!state._trackComplete) {
        if (!state.startTime) state.startTime = time
      let frame = _frames[state.track][state.frameIndex];
      state.frame = frame;
      if (time < state.delayEnd) {
        time = state.delayStart;
      } else {
        state.delayOffset = state.delayTotal;
        state.delayEnd = 0;
      }
      time -= state.delayOffset;
      state.elapsed = time - state.startTime;

      state._isAllComplete = true
        animation.draw(state);
        if (frame.draw) frame.draw(state);
        // if (update) update(state)

      if (state.nextFrame) {
        state.nextFrame = false;
        if (animation.afterFrame) animation.afterFrame(state.frameIndex, state);
        state.startTime = time
        state.frameIndex++
        if (state.frameIndex >= _frames[state.track].length) {
          if (animation.repeat) {
          state.frameIndex = 0;
            state.cycles++;
            if (_isAlternate) {
              state.reverse = (state.cycles + _isReverse) % 2;
            }
            continueAnimation = true;
          } else state._trackComplete = true
        } else continueAnimation = true;
        state.frameFraction = state.frameIndex / _frames.length;
      } else continueAnimation = true;
    };
      }

      if (continueAnimation) animation.reqId = requestAnimationFrame(step);
      else {
        if (animation.finished) animation.finished();
      }
    }
    animation.reqId = requestAnimationFrame(step);
  };

  return {
    play,
    stop,
    pause,
    set,
    destroy,
    steps,
    timeline,
  };
}
