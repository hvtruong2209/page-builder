import { useParams } from "react-router-dom";
import { configTemplates } from "../../config/template";
import DetailBuilderLayout from "../../features/detail-template/DetailBuilderLayout";
import NotFoundPage from "../not-found";
import { BuilderProvider } from "../../features/detail-template/providers/BuilderProvider";

const DetailTemplate = () => {
  const { id } = useParams();
  const template = configTemplates.find((t) => t.id === id);

  if (!template) {
    return <NotFoundPage />;
  }

  return (
    <BuilderProvider initial={template}>
      <DetailBuilderLayout />
    </BuilderProvider>
  );
};

export default DetailTemplate;
