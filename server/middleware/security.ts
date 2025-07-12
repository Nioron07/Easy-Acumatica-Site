export default defineEventHandler((event) => {
  // Remove the X-Powered-By header from all responses
  event.node.res.removeHeader('X-Powered-By');
});