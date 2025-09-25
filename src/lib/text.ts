export function truncate(text: string, max = 50) {
  return text.length <= max ? text: text.slice(0, max) + "..."
}
