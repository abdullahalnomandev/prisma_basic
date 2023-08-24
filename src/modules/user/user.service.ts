import { PrismaClient, Profile, User } from "@prisma/client";

const prisma = new PrismaClient();

const inSertUser = async (data: User): Promise<User> => {
  return await prisma.user.create({ data });
};

const insertOrUpdateProfile = async (data: Profile): Promise<Profile> => {
  // Update profile
  const isExist = await prisma.profile.findUnique({
    where: {
      userId: data.userId
    }
  });

  if (isExist) {
    return await prisma.profile.update({
      where: {
        userId: data.userId
      },
      data: {
        bio: data.bio
      }
    });
  }

  // Create a new profile
  return await prisma.profile.create({ data });
};

const getUsers = async () => {
  const results = await prisma.user.findMany({
    include:{
        profile:true
    }
  });
  return results;
};

const getSingleUser = async (id:number) => {
  const results = await prisma.user.findUnique({
    where:{
        id
    },
    include:{
        profile:true
    }
  });
  return results;
};
export const UserService = {
  inSertUser,
  insertOrUpdateProfile,
  getUsers,
  getSingleUser
};
