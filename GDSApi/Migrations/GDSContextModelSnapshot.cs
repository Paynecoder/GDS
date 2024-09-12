﻿// <auto-generated />
using System;
using GDSApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GDSApi.Migrations
{
    [DbContext(typeof(GDSContext))]
    partial class GDSContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("GDSApi.Models.ResultEntry", b =>
                {
                    b.Property<int>("Key")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Result")
                        .HasColumnType("INTEGER");

                    b.HasKey("Key");

                    b.ToTable("Results");
                });
#pragma warning restore 612, 618
        }
    }
}
