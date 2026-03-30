// Defining the props our snippet will accept
interface CodeSnippetProps {
  code: string;
}

export default function CodeSnippet({ code }: CodeSnippetProps) {
  return (
    <div className="w-full max-w-md bg-[#011221] border border-border-line rounded-xl p-6 text-sm md:text-base font-fira shadow-lg relative overflow-hidden group hover:border-accent-purple/50 transition-colors">
      {/* Subtle top reflection effect from your design */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent"></div>

      {/* The pre text preserves the exact spacing and line breaks of the code */}
      <pre className="text-text-comment overflow-x-auto custom-scrollbar">
        <code>
          {/* We use a simple regex to highlight keywords for that IDE look */}
          {code.split("\n").map((line, i) => {
            // Very basic syntax highlighting for 'function', 'const', 'return'
            const highlightedLine = line
              .replace(
                /function/g,
                '<span class="text-accent-purple">function</span>',
              )
              .replace(
                /const/g,
                '<span class="text-accent-purple">const</span>',
              )
              .replace(
                /return/g,
                '<span class="text-accent-purple">return</span>',
              )
              .replace(/=/g, '<span class="text-text-main">=</span>')
              .replace(
                /InitializedChunk/g,
                '<span class="text-[#E99287]">InitializedChunk</span>',
              );

            return (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: highlightedLine }}
              />
            );
          })}
        </code>
      </pre>
    </div>
  );
}
