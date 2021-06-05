const isDate = (val) => {
   // Cross realm comptatible
   return Object.prototype.toString.call(val) === '[object Date]';
};

const isObj = (val) => {
   return typeof val === 'object';
};

export const stringifyValue = (val) => {
   if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
   } else {
      return val;
   }
};

const buildForm = ({ action, params }) => {
   const form = document.createElement('form');
   form.setAttribute('method', 'post');
   form.setAttribute('action', action);

   Object.keys(params).forEach((key) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', stringifyValue(params[key]));
      form.appendChild(input);
   });

   return form;
};

export default (details) => {
   const form = buildForm(details);
   document.body.appendChild(form);
   form.submit();
   form.remove();
};
