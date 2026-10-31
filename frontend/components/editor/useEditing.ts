import { useEditor } from "@craftjs/core";

// True inside the admin builder, false on the public page. Placeholders only exist while editing.
export function useEditing() {
  const { enabled } = useEditor((state) => ({ enabled: state.options.enabled }));
  return enabled;
}
