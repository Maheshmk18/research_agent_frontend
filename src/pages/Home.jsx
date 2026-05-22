import React, { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import ResearchForm from "../components/ResearchForm";
import { createResearch } from "../api/researchApi";
import "../styles/home.css";

function formatResult(data) {
  if (!data) {
    return "";
  }

  if (typeof data === "string") {
    return data;
  }

  if (data.final_report) {
    return data.final_report;
  }

  if (data.report) {
    return data.report;
  }

  if (data.summary) {
    return data.summary;
  }

  return JSON.stringify(data, null, 2);
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTopic = topic.trim();

    if (!trimmedTopic) {
      setError("Please enter a research topic before submitting.");
      return;
    }

    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const response = await createResearch(trimmedTopic);
      setResult(response);
    } catch (submitError) {
      setError(submitError.message || "Failed to create research.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="home-page">
      <section className="hero-panel">
        <p className="hero-panel__eyebrow">Research Agent</p>
        <h1 className="hero-panel__title">Generate a research report from a single topic.</h1>
        {/* <p className="hero-panel__description">
          Start with one prompt, send it to your backend, and render the result here.
          This gives us a solid first screen before we add history and report details.
        </p> */}
      </section>

      <section className="content-panel">
        <ResearchForm
          topic={topic}
          onTopicChange={setTopic}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <ErrorMessage message={error} />

        {isLoading ? <LoadingSpinner message="Creating your research report..." /> : null}

        {result ? (
          <article className="result-panel">
            <div className="result-panel__header">
              <h2 className="result-panel__title">Generated Report</h2>
              <span className="result-panel__badge">Live response</span>
            </div>
            <pre className="result-panel__content">{formatResult(result)}</pre>
          </article>
        ) : null}
      </section>
    </main>
  );
}
