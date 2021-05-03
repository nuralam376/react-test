import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function AddTax() {
  const initialValues = {
    taxWord: "",
    taxNUmber: "",
  };

  const onSubmit = () => {};

  return (
    <Container>
      <Row>
        <Col md="8">
          <h1>Add Tax</h1>
        </Col>
        <Col md="4">
          <p>X</p>
        </Col>
      </Row>
      <Row>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <Row className="mb-3">
              <Col>
                <Field name="taxWord" type="text" />
              </Col>
              <Col>
                <Field
                  name="taxNumber"
                  type="text"
                  placeholder="%"
                  style={{ width: "50%" }}
                />
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <Field type="checkbox" name="applied_to" value="all" />
                <label className="ml-2">Apply to all items in collection</label>
              </Col>
              <Col md="12">
                <Field type="checkbox" name="applied_to" value="all" />
                <label className="ml-2">Apply to specific items</label>
              </Col>
            </Row>
          </Form>
        </Formik>
      </Row>
      <hr />
    </Container>
  );
}

export default AddTax;
