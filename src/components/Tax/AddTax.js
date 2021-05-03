import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Items from "../Items/Items";

function AddTax() {
  const initialValues = {
    name: "",
    rate: "",
    applied_to: "",
    applicable_items: [],
  };

  const onSubmit = async (data) => {
    console.log("Data", data);
  };

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
          {({ values, setFieldValue }) => (
            <Form>
              <Row className="mb-3">
                <Col>
                  <Field name="name" type="text" />
                </Col>
                <Col>
                  <Field
                    name="rate"
                    type="text"
                    placeholder="%"
                    style={{ width: "50%" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Field type="radio" name="applied_to" value="all" />
                  <label className="ml-2">
                    Apply to all items in collection
                  </label>
                </Col>
                <Col md="12">
                  <Field type="radio" name="applied_to" value="some" />
                  <label className="ml-2">Apply to specific items</label>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col md="12">
                  <Items values={values} setFieldValue={setFieldValue} />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
}

export default AddTax;
