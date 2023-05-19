import React, { useState } from 'react';
import './contactForm.css';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  CircularProgress,
} from '@chakra-ui/react';

import { nanoid } from 'nanoid';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    id: nanoid(),
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    let errors = {
      name: '',
      email: '',
      message: '',
    };

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!message) {
      errors.message = 'Message is required';
    }

    if (errors.name || errors.email || errors.message) {
      setFormErrors(errors);
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries',
          formData
        );
        setSuccess(true);
        console.log(response.data);
      } catch (error) {
        setSuccess(false);
      }
      console.log(formData);
      setIsLoading(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setFormErrors({
        name: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div className="wrapper">
      <h1>Contact Us</h1>
      {success !== null && (
        <p className={success ? 'success__msg' : 'error__msg'}>
          {success
            ? 'Form submmitted, thank you for your message!'
            : 'Submission error, please try again...'}
        </p>
      )}
      {formSubmitted ? (
        <>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>
                Name: <small>*</small>
              </FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </FormControl>
            <FormControl>
              <FormLabel>
                Email: <small>*</small>
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </FormControl>
            <FormControl>
              <FormLabel>Subject:</FormLabel>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Message: <small>*</small>
              </FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {formErrors.message && (
                <p className="error">{formErrors.message}</p>
              )}
            </FormControl>
            <Button
              type="submit"
              className="submit"
              colorScheme="teal"
              size="md"
              mt={4}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress size="20px" mr={2} />}
              Submit
            </Button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>
                Name: <small>*</small>
              </FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <p className="error">{formErrors.name}</p>}
            </FormControl>
            <FormControl>
              <FormLabel>
                Email: <small>*</small>
              </FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </FormControl>
            <FormControl>
              <FormLabel>Subject:</FormLabel>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Message: <small>*</small>
              </FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {formErrors.message && (
                <p className="error">{formErrors.message}</p>
              )}
            </FormControl>
            <Button
              type="submit"
              className="submit"
              colorScheme="blue"
              size="md"
              mt={4}
              disabled={isLoading}
            >
              {isLoading && <CircularProgress size="20px" mr={2} />}
              Submit
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactForm;
