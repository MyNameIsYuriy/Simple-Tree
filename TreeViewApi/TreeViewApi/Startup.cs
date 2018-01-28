using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using TreeViewApi.Models;

namespace TreeViewApi
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TreeViewContext>(opt => opt.UseInMemoryDatabase("TreeView"));
            services.AddMvc();
            services.AddCors();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(builder => builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            app.UseMvc();
            
        }
    }
}
