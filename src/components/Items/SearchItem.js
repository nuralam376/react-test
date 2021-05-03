import { Field, Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";

function SearchItem() {
  const initialValues = {
    searchText: "",
  };

  const onSubmit = () => {};

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Row className="mb-4">
            <Field type="text" name="searchitem" placeholder="% Search" />
          </Row>
          <Row style={{ backgroundColor: "grey" }}>
            <Col>
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Bracelets
              </label>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Jasinthe Bracelets
              </label>
            </Col>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Jasinthe Bracelets
              </label>
            </Col>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Inspire Bracelets
              </label>
            </Col>
          </Row>
          <Row className="mt-3" style={{ backgroundColor: "grey" }}>
            <Col>
              <Field type="checkbox" />
              <label htmlFor="" className="p-2"></label>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Zero amount item with questions
              </label>
            </Col>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Normal Item with questions
              </label>
            </Col>
            <Col md="12">
              <Field type="checkbox" />
              <label htmlFor="" className="p-2">
                Normal Item
              </label>
            </Col>
          </Row>
        </Form>
      </Formik>
      <hr />
      <Row className="text-right">
        <Col>
          <button
            style={{ backgroundColor: "#F16D3C", color: "white" }}
            className="p-2"
          >
            Apply tax to 6 items
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default SearchItem;
