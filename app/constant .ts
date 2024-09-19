interface PlatformService {
  name: string;
  selection: "source" | "destination" | null;
  inputType: React.InputHTMLAttributes<InputEvent>;
}

