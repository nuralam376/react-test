import { Field, FieldArray } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import itemsData from "./itemsData";

function Items({ values, setFieldValue }) {
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

  return (
    <div>
      <Row className="mb-4">
        <Field type="text" name="searchitem" placeholder="Search" />
      </Row>

      {categoryItems.length &&
        categoryItems.map((item) => {
          return (
            <>
              <Row key={item.id} style={{ backgroundColor: "grey" }}>
                <Col md="12">
                  <label htmlFor="" className="p-2 ml-2">
                    <Field
                      type="checkbox"
                      name="category_type"
                      value="category"
                    />
                    <span className="ml-2">{item.category.name}</span>
                  </label>
                </Col>
              </Row>
              <FieldArray
                name="tags"
                render={(arrayHelpers) => (
                  <div>
                    {categoryItems.map((category) =>
                      category.items.map((item) => (
                        <Row key={item.value} className="ml-1 p-2">
                          <label className="mb-2">
                            <Field
                              name="applicable_items"
                              type="checkbox"
                              value={item.id}
                              onChange={(e) => {
                                if (
                                  e.target.checked &&
                                  !values.applicable_items.includes(item.id)
                                ) {
                                  arrayHelpers.push(item.id);
                                  values.applicable_items.push(item.id);
                                } else {
                                  const idx = values.applicable_items.indexOf(
                                    item.id
                                  );
                                  arrayHelpers.remove(idx);
                                  values.applicable_items.splice(idx, 1);
                                }
                              }}
                            />
                            <span className="ml-2">{item.name}</span>
                          </label>
                        </Row>
                      ))
                    )}
                  </div>
                )}
              />
            </>
          );
        })}

      <Row style={{ backgroundColor: "grey" }}>
        <Col>
          <label htmlFor="" className="p-2 ml-1">
            <Field type="checkbox" name="category_type" value="non-category" />
          </label>
        </Col>
      </Row>
      <FieldArray
        name="tags"
        render={(arrayHelpers) => (
          <div>
            {nonCategoryItems.map((item) => (
              <Row key={item.value} className="ml-1 p-2">
                <label className="mb-2">
                  <Field
                    name="applicable_items"
                    type="checkbox"
                    value={item.id}
                    onChange={(e) => {
                      if (
                        e.target.checked &&
                        !values.applicable_items.includes(item.id)
                      ) {
                        arrayHelpers.push(item.id);
                        values.applicable_items.push(item.id);
                      } else {
                        const idx = values.applicable_items.indexOf(item.id);
                        arrayHelpers.remove(idx);
                        values.applicable_items.splice(idx, 1);
                      }
                    }}
                  />
                  <span className="ml-2">{item.name}</span>
                </label>
              </Row>
            ))}
          </div>
        )}
      />
      <hr />

      <Row className="text-right">
        <Col>
          <button
            style={{ backgroundColor: "#F16D3C", color: "white" }}
            className="p-2"
          >
            Apply tax to {values.applicable_items.length} items
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default Items;
