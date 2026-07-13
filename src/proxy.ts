import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
