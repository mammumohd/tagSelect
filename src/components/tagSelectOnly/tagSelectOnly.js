import React, { useState, useRef, useEffect } from "react";
import "./tagSelect.scss";
import PropTypes from "prop-types";
import { Tag } from "@carbon/react";

const TagSelect = (props) => {
  // State Variables
  const [tags, setTags] = useState(props.tagItems ? props.tagItems : []);
  const [inputValue, setInputValue] = useState("");

  const [filteredSuggestions, setFilteredSuggestions] = useState(
    props.tagItems ? props.tagItems : []
  );
  const [showSuggestion, setShowSuggestion] = useState(false);

  // ref
  const inputRef = useRef(null);
  const tagRef = useRef(null);

  // Constants
  const empty = ["No Tags Found"];
  const validKeyCodes = new Set(["Enter", "Comma", "Space"]);

  // useEffect to handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            !( event.target.id && event.target.id.substring(0, 9) == 'suggestli' ) &&
            !( tagRef.current && tagRef.current.contains(event.target)) 
        ) {
            toggleDropdow(false);
        }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // This mrthod is used to handle enter , space , comma, inputs to create the tag
  const handleKeyBlur = (event) => {
    if (
      (event.type && event.type === "blur") ||
      (event.key && validKeyCodes.has(event.key)) ||
      (event.code && validKeyCodes.has(event.codey))
    ) {
      let tagText = inputValue.trim();
      if (tagText !== "") {
        if (!tags.includes(tagText)) {
          setFilteredSuggestions([...tags, tagText]);
          setTags([...tags, tagText]);
        } else {
          setFilteredSuggestions([...tags].length > 0 ? [...tags] : empty);
        }
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
    let filtered = tags.filter((tag) => {
      return tag.includes(val);
    });
    setFilteredSuggestions(filtered.length > 0 ? filtered : empty);
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
    setFilteredSuggestions(updatedTags.length > 0 ? updatedTags : empty);
  };

  // This is tp remove the tag while clicking on a suggestion
  const handleRemoveTagOnClick = (event, suggestion) => {
    let filteredIndex = tags.indexOf(suggestion);
    if (filteredIndex > -1) {
      handleRemoveTag(event, filteredIndex);
    }
  };

  // This is used to toggle the suggestion list
  const toggleDropdow = (value) => {
    setShowSuggestion(value);
  };

  return (
    <>
      <div className="tag-select-parent" id="tag-select-parent">
        <ul
          id={"ultag" + (props.id ? props.id : "")}
          ref={tagRef}
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
              onFocus={(event) => {
                event.preventDefault();
                toggleDropdow(true);
              }}
              placeholder="Type and press Enter to add tags"
            />
          </li>
        </ul>
        {/* Dropdown for suggestions */}
        {showSuggestion && filteredSuggestions.length > 0 && (
          <ul
            className="tag-select-parent-dropdown"
            style={{ width: props.width ? `${props.width}` : "100%" }}
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={"suggestli" + index}
                id={"suggestli" + index}
                onClick={(event) => handleRemoveTagOnClick(event, suggestion)}
                //className={suggestion === "No Tags Found" ? 'disabled-li' : ''}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
