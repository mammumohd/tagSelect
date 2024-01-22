import React, { useState, useRef} from "react";
import "./tagSelect.scss";
import PropTypes from "prop-types";
import { Tag } from "@carbon/react";

const TagSelect = (props) => {
  // State Variables
  const [tags, setTags] = useState(props.tagItems ? props.tagItems : []);
  const [inputValue, setInputValue] = useState("");

  // ref
  const inputRef = useRef(null);

  // Constants
  const validCodes = new Set(['Enter', 'Comma', 'Space','Return']);
  const validKeys = new Set([',', ' ', 'Enter']);

  // This method is used to handle enter , space , comma, inputs to create the tag
  const handleKeyBlur = (event) => {
    if (
      (event.type && event.type === "blur") ||
      (event.key && validKeys.has(event.key)) ||
      (event.code && validCodes.has(event.code))
    ) {
      let tagText = inputValue.trim();
      if (tagText !== "" && !tags.includes(tagText)) {
        setTags([...tags, tagText]);
        setInputValue("");
      }
      event.preventDefault();
    }
  };

  // This method is used chnage the text of the input box
  const handleChange = (event) => {
    event.preventDefault();
    let val = event.target.value;
    setInputValue(val);
  };

  // This method will focus on input box on click
  const handleUiClick = () => {
    inputRef.current.focus();
  };

  // This is to remove the tag while clicking on it
  const handleRemoveTag = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    let updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <>
      <div className="tag-select-parent" id="tag-select-parent">
        <ul
          id={"ultag" + (props.id ? props.id : "")}
          className="list-box"
          style={{ width: props.width ? `${props.width}` : "100%" }}
          onClick={handleUiClick}
        >
          {tags.map((tag, index) => (
            <li key={"litag" + index} className="list-style">
              <Tag
                key={"tag" + index}
                type="blue"
                className="list-style-tag"
                onClick={(event) => handleRemoveTag(event, index)}
              >
                {tag}
                <span key={"spantag" + index} className="list-style-span">
                  {"  x"}
                </span>
              </Tag>
            </li>
          ))}
          <li className="tag-select-input">
            <input
              ref={inputRef}
              id="input"
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyBlur}
              onBlur={handleKeyBlur}
              placeholder="Type and press Enter to add tags"
            />
          </li>
        </ul>
      </div>
    </>
  );
};

TagSelect.propTypes = {
  id: PropTypes.any,
  width: PropTypes.any,
  tagItems: PropTypes.array,
};

export default TagSelect;
