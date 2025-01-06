import * as yup from 'yup';

const validationSchema = yup.object({
  url: yup
    .string()
    .url('Ссылка должна быть валидным URL')
    .required()
    .matches(/\.(rss|xml)$/, 'Ресурс не содержит валидный RSS')
  }
)

// const rssUrl = 'https://rutube.ru/video.xml'
// const invUrl = 'https://rutube.ru/video'
// const notUrl = 'rutube'


export const validateUrl = (input) => {
  const validationState = {
    // result: {},
    validationErrors: [],
    status: 'invalid',
  }
  
  return validationSchema.validate({url: input})
    .then(() => {
      // console.log(result, 'result');
      // validationState.result = result;
      validationState.status = 'valid';
      return validationState;
  })
    .catch((e) => {
      validationState.status = 'invalid';

      validationState.validationErrors.push(...e.errors);
      console.log('VALIDATION ERROR!!! pushed in state', e.errors);

      return validationState;
      });



}


// validateRssLink(notUrl).then((validationState) => {
//   if(validationState.validationErrors)
//     console.log(validationState.validationErrors); 
// })

  
