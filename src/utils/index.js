export const getAge = (dob) => {
  if (!dob) return ''
  let today = new Date()
  dob = new Date(dob)
  return today.getFullYear() - dob.getFullYear()
}
