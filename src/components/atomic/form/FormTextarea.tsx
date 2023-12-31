interface TextareaProps extends React.ComponentProps<any> {
  placeholder: string;
  value: string | null;
  onInput: (target: HTMLTextAreaElement) => void;
  type?: string;
  required?: boolean;
}

export default function FormTexarea({ placeholder, value, onInput, type = "text", required = true, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      class="p-0.5 px-2 rounded resize-y bg-nord2 placeholder:text-nord9 hover:bg-nord3 focus:bg-nord3 outline-none"
      placeholder={placeholder}
      value={value}
      onInput={e => onInput(e.target as HTMLTextAreaElement)}
      type={type}
      required={required}
    />
  );
}
