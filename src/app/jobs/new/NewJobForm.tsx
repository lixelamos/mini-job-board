"use client";
import H1 from "@/components/ui/h1";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Select from "@/components/ui/select";
import { createJobSchema, CreateJobValues } from "@/lib/validation";
import  {zodResolver} from "@hookform/resolvers/zod";
import { jobTypes,locationTypes  } from "@/lib/job-types";
import LoadingButton from "@/components/LoadingButton";
import RichTextEditor from "@/components/RichTextEditor";
import LocationInput from "@/components/LocationInput";
import { draftToMarkdown } from "markdown-draft-js"; 
import { X } from "lucide-react";



export default  function NewJobForm(){
    const form = useForm<CreateJobValues>({
        resolver:zodResolver(createJobSchema)
    })


    const {
        handleSubmit,
        watch,
        trigger,
        control,
        setValue,
        setFocus,
        formState:{isSubmitting},

 }  =  form;


     async function onSubmit(values:CreateJobValues){
    alert(JSON.stringify(values,null,2));   
    }


    return (
        
    <main className="m-auto my-10 max-w-3xl space-y-10">
    <div className="space-y-5 text-center">
    <H1>Find your perfect developer</H1>
    <p className="text-muted-background">
        Get your job posting published.
    </p>
    </div>
    <div className="space-y-6 border rounded -lg p-4">
    <h2 className="font-semibold">Job details</h2>
    <p className="text-muted-foreground">
        Provide the job description details 
    </p>
    <Form {...form}>
        <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField 
            control={control}
            name="title"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder=" e.g Software Engineer" {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
             />       
             <FormField 
            control={control}
            name="type"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                     <Select {...field} defaultValue= "" >
                        <option value ="" 
                        hidden>
                            Select an  Option
                        </option>
                        {jobTypes.map((jobTypes) =>(
                            <option key={jobTypes} value={jobTypes}>
                                {jobTypes}
                                </option>
                        ))}

                    </Select>
                    </FormControl>
                    <FormMessage/> 
                </FormItem>
            )}
             />
              <FormField 
            control={control}
            name="companyName"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                        <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
             />    

                <FormField 
                    control={control}
                    name="companyLogo"
                    render={({ field: { value, ...fieldValues } }) => (
                        <FormItem>
                            <FormLabel>Company Logo</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldValues}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        fieldValues.onChange(file);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />          

                <FormField 
                    control={control}
                    name="locationType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Select {...field} defaultValue=""
                                    onChange={e=>{
                                        field.onChange(e);
                                        if (e.currentTarget.value !== "Remote") {
                                            trigger("location")
                                            
                                        }
                                    }}
                                    >
                                    <option value="" hidden>
                                        Select an Option
                                    </option>
                                    {locationTypes.map((locationType) => (
                                        <option key={locationType} value={locationType}>
                                            {locationType}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
            control={control}
            name="location"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Office location</FormLabel>
                    <FormControl>
                    <LocationInput onLocationSelected={field.onChange}
                    ref={field.ref} />
                    </FormControl>
                    {watch("location")&&(
                       <div className ="flex-items center gap-1">
                        <button 
                        type="button"

                        onClick={()=>{
                            setValue("location","",{shouldValidate:true}) 

                        }}
                        >
                        < X size={20}/>
                        </button>
                        <span className ="text-sm">{watch("location")}</span>
                    </div>
                    
                    )}
                    <FormMessage/>
                </FormItem>
            )}
             />     
                <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                    </div>
                </div>
                <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl>
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>

            </form>
    </Form>
</div>
</main>
);
}