"use server";
import { getCompanyId } from "@/app/utils/libs/actions";
import { prisma } from "@/app/utils/prisma";
import { redirect } from "next/navigation";

export async function getCompany() {
  const companyId = await getCompanyId();
  const company = await prisma.company.findFirst({
    where: { id: companyId },
  });
  return company;
}

export async function updateCompany(formData: FormData) {
  const id = Number(formData.get("id"));

  const name = formData.get("name") as string;
  const updateCompany = await prisma.company.update({
    data: { name },
    where: { id },
  });
  if (!updateCompany) {
    redirect("/backoffice/locations?error=Location name is required");
  }

  redirect("/backoffice/setting?success=Company updated successfully");
}
