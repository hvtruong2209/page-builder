import "./TemplateSelector.css";
import { configTemplates } from "../../config/template";
import { TemplateMiniPreview } from "./components/TemplateMiniPreview";
import { Link } from "react-router-dom";

const TemplateSelector = () => {
  return (
    <div className="template-selector">
      <div className="template-selector__header">
        <h1 className="template-selector__title">Choose a Template</h1>
        <p className="template-selector__subtitle">
          Pick a starting point and customize it to your liking.
        </p>
      </div>
      <div className="template-selector__grid">
        {configTemplates.map((t) => (
          <Link to={`/template/${t.id}`} key={t.id} className="template-card">
            <div className="template-card__preview">
              <TemplateMiniPreview template={t} />
            </div>
            <div className="template-card__body">
              <h2 className="template-card__name">{t.name}</h2>
              <p className="template-card__desc">{t.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
