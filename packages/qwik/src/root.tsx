import { List } from './components/list/counter';
import { Logo } from './components/logo/logo';

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Logo />
        <List />
      </body>
    </>
  );
};
