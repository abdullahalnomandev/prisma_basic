import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDB = async (data: Post): Promise<Post> => {
  return prisma.post.create({
    data,
    include: {
      author: true,
      category: true
    }
  });
};
const getAllPost = async (options: any): Promise<Post[]> => {
  const { sortBy, sortOrder, searchTerm,page,limit } = options;
  console.log(options);

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);

  const take  = parseInt(limit)

  const results = await prisma.post.findMany({
    skip,
    take,
    include: {
      author: true,
      category: true
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder
          }
        : { createdAt: "desc" },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive"
            }
          }
        }
      ]
    }
  });
  return results;
};

export const PostService = {
  insertIntoDB,
  getAllPost
};
