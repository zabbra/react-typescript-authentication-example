import React, { useState } from 'react'
import { NavigateFunction, useNavigate,Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Form ,Row,Col, Button, Card, CardBody, Container} from 'react-bootstrap';
import * as Yup from "yup"

import AuthService from '../services/auth.service';



const Login: React.FC = () => {
  
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  const initialValues: {
    email: string,
    password: string,
    remember:boolean
  } = {
    email: '',
    password: '',
    remember:false
    
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("this field is required!").email("Email is invalid"),
    password: Yup.string()
      .min(5, "Atleast 6 characters long")
      .max(24, "Too Long")
      .required("this field is required!"),
    remember: Yup.bool().required().oneOf([true],"remember must be accepted"),
  })

  const handleLogin = (formValue: {email:string,password:string }) => {
    setMessage("")
    setLoading(true)
    //throw new Error();
    const { email, password } = formValue;

    

    AuthService.login(email, password).then(() => {
      navigate("/profile")
      window.location.reload();
    }).catch(error => {
      const resMessage = (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) || error.message || error.toString();

      setLoading(false);
      setMessage(resMessage);
    })
  }
  return (
    <main>
      <Container>


        <section className="section register min-vh-100 d-flex flex-column align-items-center 
        justify-content-center py-4">
          <Container>
            <Row className="justify-content-center">
              <Col lg={4} md={6} className="d-flex flex-column align-items-center justify-content-center">
                
                
                <Card className="mb-3">
                  
                  <CardBody>
                    <div className="pt-2 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your username & password to login</p>
                    </div>
                    
                    <Formik
                      initialValues={initialValues}
                      validateOnChange={true}
                      validationSchema={LoginSchema}
                      onSubmit={handleLogin}
                    >
                      {({ handleSubmit, handleChange, handleBlur, values, touched, errors
                      }) => (
                        
                        <Form className="row g-3 needs-validation" noValidate onSubmit={(event) => handleSubmit(event)}>
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
                          <Form.Group as={Col} md="12">
                            <Form.Check
                              name="remember"
                              label="Remember me"
                              feedback="Agree remember me"
                              value={values.remember}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.remember && !errors.remember}
                              isInvalid={touched.remember && !!errors.remember}
                            />
                            {touched.remember && errors.remember && (
                              <Form.Control.Feedback type="invalid">
                                {errors.remember}
                              </Form.Control.Feedback>
                            )}
                            <Form.Control.Feedback type="valid">
                               Remember Accepted
                            </Form.Control.Feedback>
                          </Form.Group>
    
                          <Button type="submit" disabled={loading}>
                            {loading && (
                              <span className='spinner-boder spinner-border-sm'></span>
                            )}
                            <span>Login</span>
                          </Button>
                          <Col>
                            <p className="small mb-0">Don't have account? 
                              <Link to="/register">Create an account</Link>
                            </p>
                          </Col>
                          {message && (<div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
                              {message}
                            </div>
                          </div>)}
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
  
    
  )
}

export default Login

/**
 * <div className='container mt-3'>
      <Form noValidate>

      </Form>
      <div className='col-md-12'>
      
      <div className='card card-container'>
        <img 
          src="//ssl.gstatic.com/account/ui/avatar_2x.png"
          alt="profile-img"
          className='profile-img-card'
        />
      </div>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      <Form>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <Field name="email" type="text" className="form-control" />
          <ErrorMessage name="email" component="div" className='alert alert-danger'/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <Field name="password" type="password" className="form-control"  />
          <ErrorMessage name="email" component="div" className='alert alert-danger'/>
        </div>

        <div className='form-group'>
            <button type="submit" disabled={loading} className="btn btn-primary btn-block">
              {loading && (
                <span className='spinner-boder spinner-border-sm'></span>
              )}
            <span>Login</span>
          </button>
          </div>
          
          {message && (
            <div className='form-group'>
              <div className='form-alert alert-danger' role='alert'>
                {message}
              </div>
            </div>
          )}
      </Form>
      
    </Formik>
    </div>
   
    </div>
    
 */