import { Field, Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Items from "../Items/Items";
import itemsData from "../Items/itemsData";

function AddTax() {
  const [categoryItems, setCategoryItems] = useState([]);

  const [nonCategoryItems] = useState(
    itemsData.filter((item) => !item.category)
  );

  useEffect(() => {
    let updatedCategoryItems = [];
    itemsData.map((item) => {
      if (item.category) {
        let categoryItem = {};
        categoryItem.category = item.category;
        const findCategoryItems = itemsData.filter(
          (categoryItem) =>
            categoryItem.category &&
            categoryItem.category.id === item.category.id
        );
        categoryItem.items = findCategoryItems;
        updatedCategoryItems.push(categoryItem);
      }
      return item;
    });
    setCategoryItems(_.uniqBy(updatedCategoryItems, "category.id"));
  }, []);
  const initialValues = {
    name: "",
    rate: "",
    applied_to: "",
    applicable_items: [],
    category_type: [],
  };

  const onSubmit = async (data) => {
    data.rate /= 100;
    delete data.category_type;
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
                  <label
                    className="ml-2"
                    onChange={(e) => {
                      if (!values.category_type.includes("category")) {
                        values.category_type.push("category");
                      }
                      if (!values.category_type.includes("non-category")) {
                        values.category_type.push("non-category");
                      }
                      nonCategoryItems.map((item) => {
                        if (!values.applicable_items.includes(item.id))
                          values.applicable_items.push(item.id);
                        else {
                          const idx = values.applicable_items.indexOf(item.id);
                          values.applicable_items.splice(idx, 1);
                        }
                      });
                      categoryItems.map((category) => {
                        category.items.map((item) => {
                          if (!values.applicable_items.includes(item.id))
                            values.applicable_items.push(item.id);
                          else {
                            const idx = values.applicable_items.indexOf(
                              item.id
                            );
                            values.applicable_items.splice(idx, 1);
                          }
                        });
                      });
                    }}
                  >
                    <Field type="radio" name="applied_to" value="all" />
                    <span className="ml-2">
                      Apply to all items in collection
                    </span>
                  </label>
                </Col>
                <Col md="12">
                  <label
                    className="ml-2"
                    onChange={(e) => {
                      values.applicable_items.splice(0);
                      values.category_type.splice(0);
                    }}
                  >
                    <Field type="radio" name="applied_to" value="some" />
                    <span className="ml-2">Apply to specific items</span>
                  </label>
                </Col>
              </Row>
              <hr />
              <Row style={{ width: "200%" }}>
                <Col md="12">
                  <Items
                    values={values}
                    setFieldValue={setFieldValue}
                    categoryItems={categoryItems}
                    nonCategoryItems={nonCategoryItems}
                  />
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
