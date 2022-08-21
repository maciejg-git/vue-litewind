let uid = 1000;

export default function useUid(component, attrs) {
  let { id } = attrs

  if (id) return id

  uid++;

  return `${component}-${uid}`
}
