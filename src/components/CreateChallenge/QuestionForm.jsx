/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AdditionalFieldsPanel from "../edit question/AdditionalFieldsPanel";
import BoilerplateCodePanel from "../edit question/BoilerplateCodePanel";
import CodeAndSolutionsPanel from "../edit question/CodeAndSolutionsPanel";
import ConstraintsTimeLimitPanel from "../edit question/ConstraintsTimeLimitPanel";
import MetricsPanel from "../edit question/MetricsPanel";
import ProblemDetailsPanel from "../edit question/ProblemDetailsPanel";

export default function QuestionForm({ problemDetails, setProblemDetails}) {
  return (
    <div className="container mx-auto p-4  grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-2">
      <ProblemDetailsPanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />

      <ConstraintsTimeLimitPanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />

      <AdditionalFieldsPanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />

      <BoilerplateCodePanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />

      <MetricsPanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />

      <CodeAndSolutionsPanel
        problemDetails={problemDetails}
        setProblemDetails={setProblemDetails}
      />
    </div>
  );
}
