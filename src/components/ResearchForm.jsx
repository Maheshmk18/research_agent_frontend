import React from "react";

export default function ResearchForm({
  topic,
  onTopicChange,
  onSubmit,
  isLoading,
}) {
  return (
    <form className="research-form" onSubmit={onSubmit}>
      <label className="research-form__label" htmlFor="topic">
        Research topic
      </label>
      <textarea
        id="topic"
        className="research-form__input"
        value={topic}
        onChange={(event) => onTopicChange(event.target.value)}
        placeholder="Example: The latest trends in agentic AI for enterprise research workflows"
        rows="5"
        disabled={isLoading}
      />
      <button className="research-form__button" type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Create Research"}
      </button>
    </form>
  );
}
