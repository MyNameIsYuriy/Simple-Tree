using Microsoft.EntityFrameworkCore;

namespace TreeViewApi.Models
{
    public class TreeViewContext : DbContext
    {
        public TreeViewContext(DbContextOptions<TreeViewContext> options)
            : base(options)
        {
        }

        public DbSet<TreeNode> TreeNodes { get; set; }

    }
}
