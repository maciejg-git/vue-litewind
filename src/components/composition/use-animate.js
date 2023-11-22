let remap = (v, range) => (v * (range[1] - range[0])) / 1 + range[0];

let animationDefaults = {
  _cycles: 0,
  _frame: 0,
  _durationOffset: 0,
}

export default function useAnimate() {
  let state = "stop";
  let startTime = 0, pausedTime = 0;
  let animations = [];

  let play = () => {
    if (state === "play") return;
    startTime = performance.now() - pausedTime;
    state = "play";
    animations.forEach((animation) => animate(animation))
  };

  let stop = () => {
    state = "stop";
    pausedTime = 0;
    animations.forEach((animation, i) => {
      cancelAnimationFrame(animation.reqId)
      animations[i] = {...animation, ...animationDefaults}
    })
  };

  let pause = () => {
    if (state === "pause" || state === "stop") return;
    state = "pause";
    pausedTime = performance.now() - startTime;
    animations.forEach((animation) => cancelAnimationFrame(animation.reqId))
  };
  // let pause = () => {
  //   // if (state === states.PAUSE || state === states.STOP) return;
  //   // state = states.PAUSE;
  //   // pausedTime = performance.now() - startTime;
  //   if (state === states.PAUSE) {
  //     state = states.START
  //     requestId = requestAnimationFrame(animate)
  //   } else {
  //     state = states.PAUSE
  //     cancelAnimationFrame(requestId);
  //   }
  // };

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
        i.repeat = i.repeat === true ? 9999999 : +i.repeat
        if (Array.isArray(i?.frames)) i._frames = [...i.frames]
        else i._frames = Array.from({length: i.frames || 1}, () => ({ duration: i.duration[1]/(i.frames || 1) }))
        i._frames = i._frames.map((f) => {
          if (!f.duration) f.duration = 0
          if (!f.timing) f.timing = i.timing
          return f
        })
        return { ...i, ...animationDefaults };
      });
  };

  let destroy = () => stop();

  let animate = (animation) => {
  let step = (time) => {
      let frame = animation._frames[animation._frame]
      let timeFraction = (time - startTime - animation._durationOffset - animation.duration[0]) / frame.duration

      if (animation._reverse) timeFraction = 1 - timeFraction;

      timeFraction = timeFraction < 0 ? 0 : timeFraction > 1 ? 1 : timeFraction;

      let progress = frame.timing(timeFraction);

      if (animation.remap) progress = remap(progress, animation.remap);

      animation.draw(progress, timeFraction, animation._frame);

      if ((!animation._reverse && timeFraction === 1) ||
        (animation._reverse && timeFraction === 0)) {
        animation._durationOffset += frame.duration
        if (animation.newFrame) animation.newFrame(animation._frame)
        if (++animation._frame >= animation._frames.length) {
          animation._frame = 0
          if (animation.repeat) {
            animation._cycles++
            if (animation._isAlternate) {
              animation._reverse = (animation._cycles + animation._isReverse) % 2
            }
            animation.reqId = requestAnimationFrame(step)
          }
        } else animation.reqId = requestAnimationFrame(step)
      } else animation.reqId = requestAnimationFrame(step)
  };
  animation.reqId = requestAnimationFrame(step) 
  }

  return {
    play,
    stop,
    pause,
    set,
    destroy,
  };
}
