using AutoMapper;
using AccesaBankAPI.Repository.UserRepository;
using BankAPI.Services;
using BankAPI.Services.UserService;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AccesaBankAPI.Repository.FriendRepository;
using BankAPI.Services.FriendService;
using AccesaBankAPI.Repository;
using AccesaBankAPI.RepositoryInterfaces;
using AccesaBankAPI.Services;
using AccesaBankAPI.ServiceInterfaces;

namespace AccesaBankAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSingleton(Configuration);
            services.AddAutoMapper();

           
            services.AddScoped<IUserService, UsersService>();  
            services.AddScoped<IFriendsService, FriendsService>();
   
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IFriendRepository, FriendRepository>();

            services.AddScoped<IOperationRepository, OperationRepository>();

            services.AddScoped<IAccountService, AccountsService>();
            services.AddScoped<IAccountRepository, AccountRepository>();

            services.AddScoped<IFriendsGroupsService, FriendsGroupsService>();
            services.AddScoped<IFriendGroupRepository, FriendGroupRepository>();

            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IMessagesService, MessagesService>();

            services.AddScoped<IBillRepository, BillRepository>();
            services.AddScoped<IBillService, BillService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
