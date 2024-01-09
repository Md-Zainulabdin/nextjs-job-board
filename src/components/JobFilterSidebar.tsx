import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";

import prisma from "@/lib/prisma";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, location, type, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

const JobFilterSidebar = async () => {
  const distinctLocation = (await prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-4 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company etc" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="">
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={""}>
              <option value="">All Locations</option>
              {distinctLocation.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>

          <Button type="submit" className="w-full">
            Filter jobs
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
