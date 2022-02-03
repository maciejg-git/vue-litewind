let uid = 0;

export default function useUid() {
  return {
    uid: uid++,
  };
}
