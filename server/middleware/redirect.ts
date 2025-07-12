export default defineEventHandler((event) => {
  const host = getRequestHost(event)
  if (host === 'www.easyacumatica.com') {
    return sendRedirect(event, `https://easyacumatica.com${event.node.req.url}`, 301)
  }
})