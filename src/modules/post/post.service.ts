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
const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);

  return await prisma.$transaction(async (tx) => {
    const results = await tx.post.findMany({
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
    const total = await tx.post.count();
    return { data: results, total };
  });
};

export const PostService = {
  insertIntoDB,
  getAllPost
};
