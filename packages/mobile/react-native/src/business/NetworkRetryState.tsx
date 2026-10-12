import React from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Text } from "../components/Text";

export function NetworkRetryState({
  title = "Connection issue",
  description = "Check your network and try again.",
  onRetry
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <Card>
      <Text variant="subtitle">{title}</Text>
      <Text muted>{description}</Text>
      <Button label="Retry" onPress={onRetry} />
    </Card>
  );
}
