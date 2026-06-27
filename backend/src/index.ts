import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Find the public role
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        const actionsToEnable = [
          'api::inquiry.inquiry.create',
          'api::review.review.find',
          'api::review.review.findOne',
          'api::review.review.create',
          'api::leadership.leadership.find',
          'api::leadership.leadership.findOne',
          'api::product.product.find',
          'api::product.product.findOne'
        ];

        for (const action of actionsToEnable) {
          // Check if permission already exists
          const existingPermission = await strapi.query('plugin::users-permissions.permission').findOne({
            where: {
              action,
              role: publicRole.id
            }
          });

          if (!existingPermission) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id
              }
            });
            console.log(`[Bootstrap] Enabled public permission for action: ${action}`);
          }
        }
      }

      // Seed reviews if database table is empty
      const reviewCount = await strapi.query('api::review.review').count();
      if (reviewCount === 0) {
        const defaultReviews = [
          {
            name: "Y S",
            location: "Nidadavole, Andhra Pradesh",
            rating: 5,
            date: "01-December-25",
            productName: "White Thermacol Box",
            responseText: "Response 👍",
            comments: "Highly satisfied with the product build and service response."
          },
          {
            name: "Quality Minds",
            location: "Vizianagaram, Andhra Pradesh",
            rating: 3,
            date: "30-July-25",
            productName: "Thermacol Box",
            responseText: "Quality 👍 Response 👍 Delivery 👍",
            comments: "Good quality packaging. Responsive delivery and prompt setup."
          }
        ];

        for (const review of defaultReviews) {
          await strapi.query('api::review.review').create({
            data: review
          });
          console.log(`[Bootstrap] Seeded review from: ${review.name}`);
        }
      }

      // Seed leadership if database table is empty
      const leadershipCount = await strapi.query('api::leadership.leadership').count();
      if (leadershipCount === 0) {
        const defaultLeadership = [
          {
            name: "Prasad",
            designation: "CEO",
            phone: "+91-8047636510",
            email: "info@vlpswan.com",
            address: "Venkateswara Lovaprasad Exports, Totagunta, Annavaram, East Godavari, Andhra Pradesh, India",
            order: 1
          }
        ];

        for (const leader of defaultLeadership) {
          await strapi.query('api::leadership.leadership').create({
            data: leader
          });
          console.log(`[Bootstrap] Seeded leader: ${leader.name}`);
        }
      }

      // Seed products if database table is empty
      const productCount = await strapi.query('api::product.product').count();
      if (productCount === 0) {
        const defaultProducts = [
          {
            title: "120 Liter Thermacol Box",
            badge: "Industrial Grade",
            imageUrl: "/assets/box_120.png",
            category: "Boxes",
            capacityLiters: 120,
            description: "High capacity, high density insulation box for heavy-duty storage and transit.",
            footerTag: "Industrial Spec",
            specs: {
              Capacity: "120 L",
              Material: "EPS",
              Density: "High Density",
              "Wall Thickness": "50 mm"
            }
          },
          {
            title: "75 Liter Ice Box",
            badge: "Commercial Grade",
            imageUrl: "/assets/box_60.png",
            category: "Boxes",
            capacityLiters: 75,
            description: "Standard commercial ice box optimized for catering, cold chain logistics, and fishing.",
            footerTag: "Cold Chain Spec",
            specs: {
              Capacity: "75 L",
              Usage: "Cold Chain",
              Material: "EPS",
              "Retention Time": "48 Hours"
            }
          },
          {
            title: "EPS Thermocol Sheets",
            badge: "Insulation Grade",
            imageUrl: "/assets/Sheets_bg.png",
            category: "Sheets",
            capacityLiters: 0,
            description: "Versatile Expanded Polystyrene sheets for thermal insulation, packaging padding, and crafts.",
            footerTag: "Custom Size",
            specs: {
              Density: "Customizable",
              Application: "Packaging",
              Thermal: "Excellent",
              Grade: "Premium"
            }
          },
          {
            title: "Bean Bag Refill",
            badge: "High Resiliency",
            imageUrl: "/assets/beans.png",
            category: "Beans",
            capacityLiters: 0,
            description: "Premium quality expanded polystyrene beans with high resiliency for cushion and beanbag refills.",
            footerTag: "High Volume",
            specs: {
              Type: "Loose Fill",
              Grade: "Premium",
              BeanSize: "3 - 5 mm",
              Yield: "Max Volume"
            }
          },
          {
            title: "Pharma Spec Box 20L",
            badge: "Pharma Grade",
            imageUrl: "/assets/box_60.png",
            category: "Pharma",
            capacityLiters: 20,
            description: "Specialized pharmaceutical insulated shippers for safe vaccine and drug logistics.",
            footerTag: "WHO Certified",
            specs: {
              Capacity: "20 L",
              "Temp Control": "High",
              Standard: "Pharma Spec",
              Security: "Sealed Lid"
            }
          },
          {
            title: "Standard Box 60L",
            badge: "Retail Standard",
            imageUrl: "/assets/box_60.png",
            category: "Boxes",
            capacityLiters: 60,
            description: "Standard general-purpose insulated boxes for logistics, personal excursions, and catering.",
            footerTag: "Standard Use",
            specs: {
              Capacity: "60 L",
              "Temp Control": "Medium",
              Material: "EPS",
              Durability: "Reinforced"
            }
          },
          {
            title: "20 Liter Mini Box",
            badge: "Compact Grade",
            imageUrl: "/assets/box_60.png",
            category: "Boxes",
            capacityLiters: 20,
            description: "Compact size lightweight shipper for quick commutes and small cold-storage demands.",
            footerTag: "Mini Spec",
            specs: {
              Capacity: "20 L",
              Material: "EPS",
              Weight: "Ultra Light",
              Portable: "Yes"
            }
          },
          {
            title: "Heavy Duty EPS Block",
            badge: "Construction",
            imageUrl: "/assets/Sheets_bg.png",
            category: "Sheets",
            capacityLiters: 0,
            description: "Large blocks of Expanded Polystyrene for geo-foam structural fill and structural insulation.",
            footerTag: "Civil Grade",
            specs: {
              Density: "30 kg/m\u00b3",
              Strength: "Structural",
              Usage: "Civil Works",
              EcoSafe: "Yes"
            }
          },
          {
            title: "High Density Beans",
            badge: "Bean Refill",
            imageUrl: "/assets/beans.png",
            category: "Beans",
            capacityLiters: 0,
            description: "High-density micro beans for medical support cushions and delicate void-fill wrapping.",
            footerTag: "Micro Spec",
            specs: {
              Type: "Micro Fill",
              Size: "1 - 2 mm",
              Density: "Dense Fit",
              Softness: "Ultra Soft"
            }
          },
          {
            title: "Pharma Box 100L Large",
            badge: "Pharma Spec",
            imageUrl: "/assets/box_120.png",
            category: "Pharma",
            capacityLiters: 100,
            description: "Large vaccine and biological spec shipper for bulk international logistics distribution.",
            footerTag: "Cold Chain Large",
            specs: {
              Capacity: "100 L",
              TempControl: "Precision",
              Duration: "72 Hours",
              Material: "EPS + PU"
            }
          },
          {
            title: "Pharma Box 40L Mid",
            badge: "Pharma Spec",
            imageUrl: "/assets/box_60.png",
            category: "Pharma",
            capacityLiters: 40,
            description: "Mid-sized vaccine and pharmaceutical biological carrier with reinforced insulation ribs.",
            footerTag: "WHO Certified",
            specs: {
              Capacity: "40 L",
              TempControl: "Precision",
              Standard: "Pharma Spec",
              Weight: "Lightweight"
            }
          },
          {
            title: "Custom Cut EPS Contour",
            badge: "Custom Mold",
            imageUrl: "/assets/Sheets_bg.png",
            category: "Sheets",
            capacityLiters: 0,
            description: "Pre-formed, contoured sheets shaped to specific consumer product borders for robust padding.",
            footerTag: "Bespoke Cut",
            specs: {
              Density: "Variable",
              Application: "Electronics",
              "Impact Lock": "Max Guard",
              FormFactor: "Contour"
            }
          },
          {
            title: "Pharma Box 10L Mini",
            badge: "Pharma Spec",
            imageUrl: "/assets/box_60.png",
            category: "Pharma",
            capacityLiters: 10,
            description: "Ultra-portable compact pharmaceutical insulated carrier with carry straps for quick deliveries.",
            footerTag: "Pharma Mini",
            specs: {
              Capacity: "10 L",
              TempControl: "Active Guard",
              WHOApproved: "Yes",
              WallThickness: "40 mm"
            }
          },
          {
            title: "Standard Box 100L",
            badge: "Retail Bulk",
            imageUrl: "/assets/box_120.png",
            category: "Boxes",
            capacityLiters: 100,
            description: "Large capacity general shipping box ideal for bulk seafood shipment, logistics and produce.",
            footerTag: "Bulk Spec",
            specs: {
              Capacity: "100 L",
              Material: "EPS",
              Retention: "36 Hours",
              WallThickness: "45 mm"
            }
          }
        ];

        for (const prod of defaultProducts) {
          await strapi.query('api::product.product').create({
            data: prod
          });
          console.log(`[Bootstrap] Seeded product: ${prod.title}`);
        }
      }
    } catch (error) {
      console.error('[Bootstrap] Error during bootstrap seeding:', error);
    }
  },
};
