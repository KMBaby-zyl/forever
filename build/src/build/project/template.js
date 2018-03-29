import nunjucks from 'nunjucks';
import path from 'path';

export function getRender() {
  const env = nunjucks.configure();

  return function* (viewPath, contextData = {}) {
    return new Promise((resolve, reject) => {
      env.render(viewPath, contextData, (err, body) => {
        if (err) {
          reject(err);
        }
        resolve(body);
      });
    });
  }
}
