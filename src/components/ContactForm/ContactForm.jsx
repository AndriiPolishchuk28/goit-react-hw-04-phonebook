import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import css from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.number().min(6).required(),
});

export const ContactForm = ({ addHandle }) => {
  const handleSubmit = ({ name, number }, { resetForm }) => {
    addHandle(name, number);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={css.form}>
        <label className={css.label_text} htmlFor="name">
          Name
        </label>
        <Field
          className={css.input}
          id="name"
          type="text"
          name="name"
          required
        />
        <label className={css.label_text} htmlFor="number">
          Number
        </label>
        <Field
          className={css.input}
          id="number"
          type="tel"
          name="number"
          required
        />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
