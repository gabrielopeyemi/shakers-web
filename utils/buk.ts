const debug = process.env.SHOW_LOGS === '1';

const impl = (values: any[], func: Function) => {
  return debug ? func(...values) : () => {};
};

export default {
  log: (...values: any) => {
    return impl(values, console.log);
  },
  warn: (...values: any) => {
    return impl(values, console.warn);
  },
  error: (...values: any) => {
    return impl(values, console.error);
  },
  info: (...values: any) => {
    return impl(values, console.info);
  },
};
