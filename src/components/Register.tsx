import React, { useState } from 'react'
import { Link } from 'react-router-dom';
//import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik} from "formik";
import * as Yup from "yup";

import { IUser } from '../types/user.type';

import { Form ,Row,Col, Button, Card, CardBody, Container} from 'react-bootstrap';
import AuthService from '../services/auth.service';



const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("this field is required"),
    email: Yup.string()
      .email("this  is not a valid email")
      .required("this field is required"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 24
      )
      .required("this field is required"),
  })

  const handleRegister = (formValue: IUser) => {

    const { username, email, password } = formValue;

    AuthService.register(username, email, password).then(
      (response) => {
      setMessage(response.data.message);
      setSuccessful(true);
    },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        
            
        setMessage(resMessage);
        setSuccessful(false);
      });
    
  };
  return (
    <main>
      <Container>

        <section className="section register min-vh-100 d-flex flex-column align-items-center 
        justify-content-center">
          <Container>
            <Row className="justify-content-center">
              <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                
                
                <Card className="mb-3">
                  
                  <CardBody>
                    <div>
                      <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                      <p className="text-center small">Enter your personal details to create account</p>
                    </div>
                    
                    <Formik
                      initialValues={initialValues}
                      validateOnChange={true}
                      validationSchema={RegisterSchema}
                      onSubmit={handleRegister}
                    >
                      {({ handleSubmit, handleChange, handleBlur, values, touched, errors,isSubmitting
                      }) => (
                        
                        <Form className="row g-3 needs-validation" noValidate onSubmit={(event) => handleSubmit(event)}>
                          {!successful && (
                            <>
                                <Form.Group as={Col} md="12">
                              <Form.Label>username *</Form.Label>
                              <Form.Control
                                type="text"
                                name="username"
                                placeholder='please Enter your username'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.username && !errors.username}
                                isInvalid={touched.username && !!errors.username}
                              />
                              {touched.username && errors.username && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.username}
                                </Form.Control.Feedback>
                              )}
                              <Form.Control.Feedback type="valid">
                                Valid username
                              </Form.Control.Feedback>
                              </Form.Group>
                              
                              <Form.Group as={Col} md="12">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder='example@example.com'
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.email && !errors.email}
                              isInvalid={touched.email && !!errors.email}
                            />
                            {touched.email && errors.email && (
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            )}
                            <Form.Control.Feedback type="valid">
                              Valid email
                            </Form.Control.Feedback>
                              </Form.Group>
                              
                              <Form.Group as={Col} md="12" controlId='validationFormik01'>
                            <Form.Label>Password *</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder='password'
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.password && !errors.password}
                              isInvalid={touched.password && !!errors.password}
                            />
                            {touched.password && errors.password && (
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
                            )}
                        
                          </Form.Group>

                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                              <span className='spinner-boder spinner-border-sm'></span>
                            )}
                            <span>Login</span>
                            </Button>
                              <Col>
                            <p className="small mb-0"> Already have an account?
                              <Link to="/login">Login</Link>
                            </p>
                          </Col>
                          
                            </>
                          )}
                           {message && (
                            <div className="form-group">
                              <div
                                className={
                                  successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                              >
                                {message}
                              </div>
                            </div>
                          )}
                          
                        </Form>
                      )}
                    </Formik>
                  </CardBody>
                </Card>
              </Col>  
            </Row>
          </Container>
        </section>
      </Container>
      
    </main>
  
  
  );
};

export default Register

