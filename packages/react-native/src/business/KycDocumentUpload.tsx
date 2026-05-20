import React from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Text } from "../components/Text";

export function KycDocumentUpload({
  title = "Identity document",
  onUpload
}: {
  title?: string;
  onUpload?: () => void;
}) {
  return (
    <Card>
      <Text variant="subtitle">{title}</Text>
      <Text muted>Upload a clear photo or scan for verification.</Text>
      <Button label="Upload document" variant="secondary" onPress={onUpload} />
    </Card>
  );
}
