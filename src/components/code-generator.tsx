"use client";

import { useState, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Clipboard, Check, Wand2, Languages, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateCode } from "@/app/actions";
import { Skeleton } from "./ui/skeleton";

const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "TypeScript",
  "Go",
  "Rust",
  "HTML",
  "CSS",
  "SQL",
  "Shell",
];

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, { message: "Prompt must be at least 10 characters." }),
  language: z.string({ required_error: "Please select a language." }),
});

type FormValues = z.infer<typeof formSchema>;

export function CodeGenerator() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const codeOutputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedCode("");
    const result = await generateCode(data);
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error Generating Code",
        description: result.error,
      });
    } else if (result.code) {
      setGeneratedCode(result.code);
    }
  };

  const copyToClipboard = () => {
    if (!codeOutputRef.current) return;
    const codeToCopy = codeOutputRef.current.value;
    if (!codeToCopy || codeToCopy === "Your generated code will appear here.")
      return;

    navigator.clipboard.writeText(codeToCopy);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 className="text-primary" />
            Create with AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Create a React component for a login form with email and password fields'"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Languages size={16} /> Language
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isGenerating}
                className="w-full"
                variant="accent"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Code"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="relative">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot />
              Generated Code
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              disabled={isGenerating}
            >
              {hasCopied ? (
                <Check className="text-green-500" />
              ) : (
                <Clipboard />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {isGenerating ? (
                <div className="bg-muted rounded-md p-4 min-h-[310px] space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[50%]" />
                  <Skeleton className="h-4 w-[90%]" />
                </div>
              ) : (
                <Textarea
                  ref={codeOutputRef}
                  key={generatedCode} // re-render with new default value when code is generated
                  defaultValue={generatedCode}
                  placeholder="Your generated code will appear here."
                  className="min-h-[310px] resize-y font-code text-sm bg-muted"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
