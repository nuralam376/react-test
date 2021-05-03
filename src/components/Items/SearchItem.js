import { Field, Form, Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import itemsData from "./itemsData";

function SearchItem() {
  const initialValues = {
    searchText: "",
    categoryItems: [],
    checkedNonCategoryItems: [],
  };

  const onSubmit = () => {};

  const [categoryItems, setCategoryItems] = useState([]);

  const [nonCategoryItems, setNonCategoryItems] = useState(
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
    });
    setCategoryItems(_.uniqBy(updatedCategoryItems, "category.id"));
  }, []);

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Row className="mb-4">
            <Field type="text" name="searchitem" placeholder="% Search" />
          </Row>

          {categoryItems.length &&
            categoryItems.map((item) => {
              return (
                <>
                  <Row key={item.id} style={{ backgroundColor: "grey" }}>
                    <Col>
                      <Field type="checkbox" />
                      <label htmlFor="" className="p-2">
                        {item.category.name}
                      </label>
                    </Col>
                  </Row>
                  {item.items.map((itemDetail) => (
                    <Row key={itemDetail.id} className="mt-3">
                      <Col md="12">
                        <Field
                          type="checkbox"
                          name="categoryItems"
                          value={itemDetail.id}
                        />
                        <label htmlFor="" className="p-2">
                          {itemDetail.name}
                        </label>
                      </Col>
                    </Row>
                  ))}
                </>
              );
            })}

          <Row style={{ backgroundColor: "grey" }}>
            <Col>
              <label htmlFor="" className="p-2">
                <Field
                  type="checkbox"
                  className="ml-2"
                  name="checkedNonCategoryItems[]"
                  value="all"
                />
              </label>
            </Col>
          </Row>
          {nonCategoryItems.length &&
            nonCategoryItems.map((item) => {
              console.log("Item", item.id);
              return (
                <>
                  <Row key={item.id} className="mt-3">
                    <Col md="12">
                      <label htmlFor="" className="p-2">
                        <Field
                          type="checkbox"
                          name="checkedNonCategoryItems[]"
                          value={item.id}
                        />
                        <span className="ml-2">{item.name}</span>
                      </label>
                    </Col>
                  </Row>
                </>
              );
            })}
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
